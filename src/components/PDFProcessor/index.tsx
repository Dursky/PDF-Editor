import React, {useState} from "react"
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform} from "react-native"
import DocumentPicker from "react-native-document-picker"
import {PDFDocument, TextEdit} from "../../types"

const PDFProcessor: React.FC = () => {
	const [selectedPdfs, setSelectedPdfs] = useState<PDFDocument[]>([])
	const [processing, setProcessing] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [selectedPages, setSelectedPages] = useState<number[]>([])
	const [showTextEditor, setShowTextEditor] = useState<boolean>(false)
	const [textEdits, setTextEdits] = useState<TextEdit[]>([])
	const [outputDirectory, setOutputDirectory] = useState<string>("")

	const pickPDF = async () => {
		try {
			const results = await DocumentPicker.pick({
				type: [DocumentPicker.types.pdf],
				allowMultiSelection: true,
			})

			const pdfs = (Array.isArray(results) ? results : [results]).map((result) => ({
				uri: result.uri,
				name: result.name || "document.pdf",
				size: result.size,
			})) as PDFDocument[]

			setSelectedPdfs((prevPdfs) => [...prevPdfs, ...pdfs])
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

	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>PDF Processor</Text>

				<TouchableOpacity style={styles.button} onPress={pickPDF} disabled={processing}>
					<Text style={styles.buttonText}>Select PDF</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button}
					onPress={selectOutputDirectory}
					disabled={processing}>
					<Text style={styles.buttonText}>Select Output Directory</Text>
				</TouchableOpacity>

				{selectedPdfs.map((pdf, index) => (
					<View key={index} style={styles.fileInfo}>
						<Text>File: {pdf.name}</Text>
						{pdf.size && <Text>Size: {(pdf.size / 1024).toFixed(2)} KB</Text>}
						<TouchableOpacity
							style={styles.deleteButton}
							onPress={() => {
								setSelectedPdfs((pdfs) => pdfs.filter((_, i) => i !== index))
							}}>
							<Text style={styles.deleteButtonText}>Delete</Text>
						</TouchableOpacity>
					</View>
				))}

				{error && <Text style={styles.error}>{error}</Text>}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		padding: 20,
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
	deleteButton: {
		backgroundColor: "#FF3B30",
		padding: 8,
		borderRadius: 4,
		marginTop: 5,
	},
	deleteButtonText: {
		color: "#fff",
		textAlign: "center",
	},
	error: {
		color: "#FF3B30",
		marginTop: 10,
	},
})

export default PDFProcessor
