import React from "react"
import {SafeAreaView, StatusBar, StyleSheet, View} from "react-native"
import PDFProcessor from "./src/components/PDFProcessor"

const App = () => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
			<View style={styles.container}>
				<PDFProcessor />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	container: {
		flex: 1,
	},
})

export default App
