import React, {useState} from "react"
import {View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet} from "react-native"
import DocumentPicker from "react-native-document-picker"
import RNFS from "react-native-fs"
import Share from "react-native-share"
import {PDFDocument, rgb} from "pdf-lib"
import {requestStoragePermission} from "../utils/permissions"
import {TextEditor} from "../TextEditor"
import {PDFDocument as PDFDocumentType, TextEdit} from "../../types"

const PDFProcessor: React.FC = () => {
	const [selectedPdfs, setSelectedPdfs] = useState<PDFDocumentType[]>([])
	const [processing, setProcessing] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [compressionQuality, setCompressionQuality] = useState<number>(0.7)
	const [password, setPassword] = useState<string>("")
	const [watermarkText, setWatermarkText] = useState<string>("")
	const [selectedPages, setSelectedPages] = useState<number[]>([])
	const [showTextEditor, setShowTextEditor] = useState<boolean>(false)
	const [textEdits, setTextEdits] = useState<TextEdit[]>([])
	const [outputDirectory, setOutputDirectory] = useState<string>(RNFS.DocumentDirectoryPath)

	const pickPDF = async () => {
		try {
			const results = await DocumentPicker.pickMultiple({
				type: [DocumentPicker.types.pdf],
			})

			const pdfs = results.map((result) => ({
				uri: result.uri,
				name: result.name || "document.pdf",
				size: result.size,
			}))

			setSelectedPdfs([...selectedPdfs, ...pdfs])
			setError(null)
		} catch (err) {
			if (!DocumentPicker.isCancel(err)) {
				setError("Error selecting file")
				console.error(err)
			}
		}
	}

	const selectOutputDirectory = async () => {
		try {
			const result = await DocumentPicker.pickDirectory()
			if (result) {
				setOutputDirectory(result.uri)
			}
		} catch (err) {
			if (!DocumentPicker.isCancel(err)) {
				setError("Error selecting directory")
			}
		}
	}

	const processPDF = async () => {
		if (selectedPdfs.length === 0) return

		const hasPermission = await requestStoragePermission()
		if (!hasPermission) {
			setError("Storage permission denied")
			return
		}

		setProcessing(true)
		setError(null)

		try {
			const pdfDoc = await PDFDocument.create()

			// Loading and merging PDFs
			for (const pdf of selectedPdfs) {
				const pdfBytes = await RNFS.readFile(pdf.uri, "base64")
				const loadedPdf = await PDFDocument.load(pdfBytes)

				const pagesToCopy =
					selectedPages.length > 0
						? selectedPages.filter((p) => p < loadedPdf.getPageCount())
						: loadedPdf.getPageIndices()

				const copiedPages = await pdfDoc.copyPages(loadedPdf, pagesToCopy)
				copiedPages.forEach((page) => pdfDoc.addPage(page))
			}

			// Adding text
			const pages = pdfDoc.getPages()
			for (const edit of textEdits) {
				const page = pages[edit.page]
				if (page) {
					page.drawText(edit.text, {
						x: edit.x,
						y: edit.y,
						size: 12,
						color: rgb(0, 0, 0),
					})
				}
			}

			// Adding watermark
			if (watermarkText) {
				pages.forEach((page) => {
					const {width, height} = page.getSize()
					page.drawText(watermarkText, {
						x: width / 2 - 150,
						y: height / 2,
						size: 50,
						opacity: 0.3,
						rotate: Math.PI / 4,
						color: rgb(0.5, 0.5, 0.5),
					})
				})
			}

			// Compression and security
			const pdfBytes = await pdfDoc.save({
				useObjectStreams: true,
				addDefaultPage: false,
				compress: true,
				...(password
					? {
							userPassword: password,
							ownerPassword: password,
					  }
					: {}),
			})

			// Saving file
			const outputPath = `${outputDirectory}/processed_${Date.now()}.pdf`
			await RNFS.writeFile(outputPath, pdfBytes, "base64")

			// Sharing
			await Share.open({
				url: `file://${outputPath}`,
				type: "application/pdf",
				title: "Share processed PDF",
			})

			// Cleanup
			setSelectedPdfs([])
			setTextEdits([])
			setSelectedPages([])
		} catch (err) {
			console.error(err)
			setError("Error processing file")
		} finally {
			setProcessing(false)
		}
	}

	const handleAddText = () => {
		setTextEdits([
			...textEdits,
			{
				page: 0,
				x: 50,
				y: 50,
				text: "",
			},
		])
	}

	const handleUpdateText = (index: number, text: string) => {
		const newEdits = [...textEdits]
		newEdits[index].text = text
		setTextEdits(newEdits)
	}

	const handleDeleteText = (index: number) => {
		const newEdits = textEdits.filter((_, i) => i !== index)
		setTextEdits(newEdits)
	}

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>PDF Processor</Text>

			<TouchableOpacity style={styles.button} onPress={pickPDF} disabled={processing}>
				<Text style={styles.buttonText}>Select PDF</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button} onPress={selectOutputDirectory}>
				<Text style={styles.buttonText}>Select Output Directory</Text>
			</TouchableOpacity>

			<Text style={styles.label}>Compression ({(compressionQuality * 100).toFixed(0)}%)</Text>
			<TextInput
				style={styles.input}
				value={compressionQuality.toString()}
				onChangeText={(text) => {
					const value = parseFloat(text)
					if (!isNaN(value) && value >= 0 && value <= 1) {
						setCompressionQuality(value)
					}
				}}
				keyboardType="numeric"
			/>

			<Text style={styles.label}>Password Protection</Text>
			<TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

			<Text style={styles.label}>Watermark Text</Text>
			<TextInput style={styles.input} value={watermarkText} onChangeText={setWatermarkText} />

			<TouchableOpacity style={styles.button} onPress={() => setShowTextEditor(true)}>
				<Text style={styles.buttonText}>Edit Text</Text>
			</TouchableOpacity>

			{selectedPdfs.map((pdf, index) => (
				<View key={index} style={styles.fileInfo}>
					<Text>File: {pdf.name}</Text>
					<Text>Size: {(pdf.size || 0) / 1024} KB</Text>
					<TouchableOpacity
						style={styles.deleteButton}
						onPress={() => {
							const newPdfs = selectedPdfs.filter((_, i) => i !== index)
							setSelectedPdfs(newPdfs)
						}}>
						<Text style={styles.deleteButtonText}>Delete</Text>
					</TouchableOpacity>
				</View>
			))}

			{selectedPdfs.length > 0 && (
				<TouchableOpacity
					style={[styles.button, styles.processButton]}
					onPress={processPDF}
					disabled={processing}>
					<Text style={styles.buttonText}>{processing ? "Processing..." : "Process PDF"}</Text>
				</TouchableOpacity>
			)}

			{error && <Text style={styles.error}>{error}</Text>}

			<TextEditor
				visible={showTextEditor}
				textEdits={textEdits}
				onClose={() => setShowTextEditor(false)}
				onAddText={handleAddText}
				onUpdateText={handleUpdateText}
				onDeleteText={handleDeleteText}
			/>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 30,
		textAlign: "center",
	},
	button: {
		backgroundColor: "#007AFF",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 10,
	},
	processButton: {
		backgroundColor: "#34C759",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	fileInfo: {
		marginVertical: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
	},
	error: {
		color: "red",
		marginTop: 10,
	},
	label: {
		fontSize: 16,
		marginTop: 10,
		marginBottom: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
	},
	deleteButton: {
		backgroundColor: "#FF3B30",
		padding: 8,
		borderRadius: 4,
	},
	deleteButtonText: {
		color: "#fff",
	},
})

export default PDFProcessor
