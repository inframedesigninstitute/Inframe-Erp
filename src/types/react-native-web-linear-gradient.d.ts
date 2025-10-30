declare module 'react-native-web-linear-gradient' {
  import * as React from 'react';
    import { StyleProp, ViewStyle } from 'react-native';

  export interface LinearGradientProps {
    colors: string[]
    start?: { x: number; y: number }
    end?: { x: number; y: number }
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode
  }

  export default class LinearGradient extends React.Component<LinearGradientProps> {}
}
