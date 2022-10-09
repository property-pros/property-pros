import React from 'react';
import { ImageStyle } from 'react-native';

export interface IMenuItem {
  title: string;
  icon: (style: ImageStyle) => React.ReactElement;
}
