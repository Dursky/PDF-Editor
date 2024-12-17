export interface PDFDocument {
	uri: string
	name: string
	size?: number
	pages?: number
}

export interface TextEdit {
	page: number
	x: number
	y: number
	text: string
}
