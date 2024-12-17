import {PDFDocument, rgb} from "pdf-lib"
import {TextEdit} from "../types"

export const addWatermark = async (
	page: PDFDocument["getPages"][0],
	text: string,
	opacity: number = 0.3,
) => {
	const {width, height} = page.getSize()
	page.drawText(text, {
		x: width / 2 - 150,
		y: height / 2,
		size: 50,
		opacity,
		rotate: Math.PI / 4,
		color: rgb(0.5, 0.5, 0.5),
	})
}

export const addTextToPage = (page: PDFDocument["getPages"][0], textEdit: TextEdit) => {
	page.drawText(textEdit.text, {
		x: textEdit.x,
		y: textEdit.y,
		size: 12,
		color: rgb(0, 0, 0),
	})
}
