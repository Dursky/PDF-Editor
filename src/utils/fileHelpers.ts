import RNFS from "react-native-fs"

export const getFileSize = (bytes: number): string => {
	if (bytes === 0) return "0 Bytes"
	const k = 1024
	const sizes = ["Bytes", "KB", "MB", "GB"]
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export const ensureDirectoryExists = async (path: string): Promise<void> => {
	try {
		const exists = await RNFS.exists(path)
		if (!exists) {
			await RNFS.mkdir(path)
		}
	} catch (error) {
		console.error("Error creating directory:", error)
		throw error
	}
}
