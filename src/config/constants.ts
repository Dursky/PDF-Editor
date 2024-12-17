export const PDF_CONSTANTS = {
	COMPRESSION: {
		MIN: 0,
		MAX: 1,
		DEFAULT: 0.7,
	},
	TEXT: {
		DEFAULT_SIZE: 12,
		DEFAULT_X: 50,
		DEFAULT_Y: 50,
	},
	WATERMARK: {
		DEFAULT_OPACITY: 0.3,
		DEFAULT_SIZE: 50,
	},
}

export const FILE_TYPES = {
	PDF: "application/pdf",
}

export const PERMISSIONS = {
	STORAGE: {
		TITLE: "Storage Permission Required",
		MESSAGE: "This app needs access to your storage to process PDF files",
		BUTTONS: {
			POSITIVE: "OK",
			NEGATIVE: "Cancel",
			NEUTRAL: "Ask Me Later",
		},
	},
}
