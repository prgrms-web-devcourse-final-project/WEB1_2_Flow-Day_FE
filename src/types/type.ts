// types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface SearchResult {
    place_id: string;
    description: string;
  }

  export type RootStackParamList = {
    Map: undefined;
    Search: undefined;
  };

  export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;