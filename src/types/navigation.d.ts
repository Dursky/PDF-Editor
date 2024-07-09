import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  PdfEditor: {uri: string};
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type PdfEditorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PdfEditor'
>;

export type PdfEditorScreenRouteProp = RouteProp<
  RootStackParamList,
  'PdfEditor'
>;
