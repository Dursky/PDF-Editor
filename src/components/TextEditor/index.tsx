import React from "react"
import {View, Text, TouchableOpacity, TextInput, Modal, StyleSheet} from "react-native"
import {TextEdit} from "../../types"

interface TextEditorProps {
	visible: boolean
	textEdits: TextEdit[]
	onClose: () => void
	onAddText: () => void
	onUpdateText: (index: number, text: string) => void
	onDeleteText: (index: number) => void
}

export const TextEditor: React.FC<TextEditorProps> = ({
	visible,
	textEdits,
	onClose,
	onAddText,
	onUpdateText,
	onDeleteText,
}) => {
	return (
		<Modal visible={visible} animationType="slide" transparent={true}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Text Editor</Text>

					{textEdits.map((edit, index) => (
						<View key={index} style={styles.editRow}>
							<TextInput
								style={styles.textInput}
								value={edit.text}
								onChangeText={(text) => onUpdateText(index, text)}
								placeholder="Enter text"
							/>
							<Text>Page: {edit.page + 1}</Text>
							<TouchableOpacity onPress={() => onDeleteText(index)} style={styles.deleteButton}>
								<Text style={styles.deleteButtonText}>Delete</Text>
							</TouchableOpacity>
						</View>
					))}

					<TouchableOpacity style={styles.button} onPress={onAddText}>
						<Text style={styles.buttonText}>Add Text</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
						<Text style={styles.buttonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContent: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 8,
		width: "90%",
		maxHeight: "80%",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	editRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	textInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 4,
		padding: 8,
		marginRight: 10,
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
	deleteButton: {
		backgroundColor: "#FF3B30",
		padding: 8,
		borderRadius: 4,
	},
	deleteButtonText: {
		color: "#fff",
	},
	closeButton: {
		backgroundColor: "#8E8E93",
	},
})
