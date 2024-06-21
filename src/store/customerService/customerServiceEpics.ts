import {
  catchError,
  concat,
  filter,
  finalize,
  mergeMap,
  switchMap,
} from 'rxjs';

import { customerServiceActions } from './customerServiceSlice';
import { startLoading, stopLoading } from '../loading';
import { RootEpic } from '../types';
import { setToken } from '@/services/HttpClient';
import { login } from '@/services/IdentityService';
import Utils from '@/utils';
import { getApplicationConfiguration } from '@/services/AppConfigService';
import { publicCmsActions } from '../publicCms';

export const customerServiceEpics = [];
