import {Platform, PermissionsAndroid} from "react-native"

export const requestStoragePermission = async () => {
	if (Platform.OS === "android") {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				{
					title: "Storage Permission Required",
					message: "This app needs access to your storage to process PDF files",
					buttonNeutral: "Ask Me Later",
					buttonNegative: "Cancel",
					buttonPositive: "OK",
				},
			)
			return granted === PermissionsAndroid.RESULTS.GRANTED
		} catch (err) {
			console.warn(err)
			return false
		}
	}
	return true
}
