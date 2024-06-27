import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MenuResponse } from '@/services/MenuService';
import { CompanyResponse } from '@/services/CompanyService';
import { BannerResponse } from '@/services/BannerService';
import { CaptchaResponse } from '@/services/PublicCmsService';
import {
  ContentResponse,
  ContentsPagingResponse,
} from '@/services/ContentService';
import { NewsTypeResponse } from '@/services/NewsTypeService';
import { PageContentResponse } from '@/services/PageContentService';
import { DepartmentResponse } from '@/services/DepartmentService';
import { FileResponse, FolderResponse } from '@/services/FileService';
import { DocumentTypeResponse } from '@/services/DocumentTypeService';

interface publicCmsState {
  company?: CompanyResponse;
  menuList: MenuResponse[];
  banners: BannerResponse[];
  news?: ContentsPagingResponse;
  newsParams?: any;
  investorNews?: ContentsPagingResponse;
  investorNewsParams?: any;
  latestNews?: ContentsPagingResponse;
  newsTypes?: NewsTypeResponse[];
  documentTypes?: DocumentTypeResponse[];
  documentList?: FileResponse[];
  selectedNewsTypeId?: string;
  captcha?: CaptchaResponse;
  servicePages: PageContentResponse[];
  introducePage?: PageContentResponse;
  selectedPageDetail?: PageContentResponse;
  selectedNewsDetail?: ContentResponse;
  departments?: DepartmentResponse[];
  photos?: FolderResponse[];
  photoAlbumPath: FolderResponse[];
  videos?: FolderResponse[];
  videosAlbumPath: FolderResponse[];
  logos?: FolderResponse[];
}

const initialState: publicCmsState = {
  menuList: [],
  banners: [],
  servicePages: [],
  photos: [],
  videos: [],
  logos: [],
  photoAlbumPath: [],
  videosAlbumPath: [],
  documentList: [],
};

const publicCmsSlice = createSlice({
  name: 'publicCms',
  initialState,
  reducers: {
    getCompanyRequest: (state, action) => {},
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    getMenuListRequest: (state, action) => {},
    setMenuList: (state, action) => {
      state.menuList = action.payload;
    },
    getBannerListRequest: (state, action) => {},
    setBannerList: (state, action) => {
      state.banners = action.payload;
    },
    getNewsListRequest: (state, action) => {},
    setNewsList: (state, action) => {
      state.news = action.payload;
    },
    setNewsParams: (state, action) => {
      state.newsParams = action.payload;
    },
    getMoreNewsListRequest: (state, action) => {},
    setInvestorNewsList: (state, action) => {
      state.investorNews = action.payload;
    },
    setInvestorNewsParams: (state, action) => {
      state.investorNewsParams = action.payload;
    },
    getInvestorNewsListRequest: (state, action) => {},
    getLatestNewsListRequest: (state, action) => {},
    setLatestNewsList: (state, action) => {
      state.latestNews = action.payload;
    },
    getNewsTypesRequest: (state, action) => {},
    setNewsTypes: (state, action) => {
      state.newsTypes = action.payload;
    },
    getDocumentTypesRequest: (state, action) => {},
    setDocumentTypes: (state, action) => {
      state.documentTypes = action.payload;
    },
    getDocumentListRequest: (
      state,
      action: PayloadAction<{
        params: { DocumentTypeId?: string; Year?: number };
      }>
    ) => {},
    setDocumentList: (state, action) => {
      state.documentList = action.payload;
    },
    setSelectedNewsTypeId: (state, action) => {
      state.selectedNewsTypeId = action.payload;
    },
    getCaptchaRequest: (state) => {},
    setCaptcha: (state, action) => {
      state.captcha = action.payload;
    },
    getServicePagesRequest: (state) => {},
    setServicePages: (state, action) => {
      state.servicePages = action.payload;
    },
    getIntroducePageRequest: (state) => {},
    setIntroducePage: (state, action) => {
      state.introducePage = action.payload;
    },
    getPageDetailBySlugRequest: (state, action) => {},
    setSelectedPageDetail: (state, action) => {
      state.selectedPageDetail = action.payload;
    },
    getNewsDetailBySlugRequest: (state, action) => {},
    setSelectedNewsDetail: (state, action) => {
      state.selectedNewsDetail = action.payload;
    },
    getDepartmentsRequest: (state, action) => {},
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    getPhotosRequest: (state, action) => {},
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    getVideosRequest: (state, action) => {},
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setPhotoAlbumPath: (state, action) => {
      state.photoAlbumPath = action.payload;
    },
    setVideoAlbumPath: (state, action) => {
      state.videosAlbumPath = action.payload;
    },
    downloadFileRequest: (
      state,
      action: PayloadAction<{ document: FileResponse }>
    ) => {},
    getLogosRequest: (state, action) => {},
    setLogos: (state, action) => {
      state.logos = action.payload;
    },
  },
});

export const publicCmsActions = publicCmsSlice.actions;
export const publicCmsReducer = publicCmsSlice.reducer;
