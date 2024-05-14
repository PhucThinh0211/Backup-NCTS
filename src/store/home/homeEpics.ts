import { homeActions} from '@/store/home';
import { filter, mergeMap } from 'rxjs';
import { RootEpic } from '../types';


const homeState: RootEpic = (action$) => {
  return action$.pipe(
    filter(homeActions.toggleMenu.match),    
    filter(homeActions.toggleSearch.match),
    mergeMap(() => [])
  );

    
 
};
export const homeEpics = [homeState];