// styled.d.ts
import 'styled-components';
import { Theme } from '../client/src/shared/utils/types';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
