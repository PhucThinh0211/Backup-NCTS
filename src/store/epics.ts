import { combineEpics } from "redux-observable";

import { persistStateEpics } from "./persistState";
import { appEpics } from "./app";
import { menuEpics } from "./menu";
import { bannerEpics } from "./banner";
import { contentEpics } from "./content";
import { companyEpics } from "./company";
import { pageContentEpics } from "./pageContent";
import { departmentEpics } from "./department";
import { publicCmsEpics } from "./publicCms";
import { homeEpics } from "./home"

const rootEpics = combineEpics(
  ...persistStateEpics,
  ...appEpics,
  ...menuEpics,
  ...homeEpics,
  ...bannerEpics,
  ...contentEpics,
  ...companyEpics,
  ...pageContentEpics,
  ...departmentEpics,
  ...publicCmsEpics,
);

export default rootEpics;
