import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import {PDFDocument} from 'react-native-pdf-lib';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'PdfEditor'>;
  route: RouteProp<RootStackParamList, 'PdfEditor'>;
};

const PdfEditorScreen: React.FC<Props> = ({route}) => {
  const {uri} = route.params;
  const [pdfUri, setPdfUri] = useState(uri);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdfBytes = await RNFS.readFile(uri, 'base64');
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Example of editing a PDF (adding a blank page)
        pdfDoc.addPage();

        const modifiedPdfBytes = await pdfDoc.saveAsBase64();
        const modifiedPdfUri = `${RNFS.DocumentDirectoryPath}/modified.pdf`;

        await RNFS.writeFile(modifiedPdfUri, modifiedPdfBytes, 'base64');
        setPdfUri(modifiedPdfUri);
      } catch (err) {
        console.log(err);
      }
    };

    loadPdf();
  }, [uri]);

  return (
    <View style={styles.container}>
      <Pdf
        source={{uri: pdfUri}}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default PdfEditorScreen;
