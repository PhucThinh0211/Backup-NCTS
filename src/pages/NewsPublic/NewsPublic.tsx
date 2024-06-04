import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Button, Col, Row } from "antd";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getNewsList,
  getNewsParams,
  getNewsTypeList,
  getSelectedPageDetail,
  publicCmsActions,
} from "@/store/publicCms";

import { NewsPublicSection } from "./components/NewsPublicSection";
import { NewsPublicSider } from "./components/NewsPublicSider";
import {
  GettingMoreContentListLoadingKey,
  defaultPagingParams,
  largePagingParams,
} from "@/common";
import { getLanguage } from "@/store/persistState";
import { NewsTypeResponse } from "@/services/NewsTypeService";
import { getLoading } from "@/store/loading";

export const NewsPublic = () => {
  const { t } = useTranslation(["common"]);
  const dispatch = useAppDispatch();

  const lang = useAppSelector(getLanguage());
  const news = useAppSelector(getNewsList());
  const newsParams = useAppSelector(getNewsParams());
  const newsTypes = useAppSelector(getNewsTypeList());
  const pageDetail = useAppSelector(getSelectedPageDetail());
  const isFetchingMore = useAppSelector(
    getLoading(GettingMoreContentListLoadingKey)
  );

  const foundNewsType = (newsTypes?.items || []).find(
    (newsType) => newsType.code === pageDetail?.codeType
  );

  useEffect(() => {
    dispatch(
      publicCmsActions.getNewsTypesRequest({ params: largePagingParams })
    );
  }, [lang]);

  useEffect(() => {
    if (pageDetail && foundNewsType) {
      dispatch(
        publicCmsActions.getNewsListRequest({
          params: {
            ...defaultPagingParams,
            MaxResultCount: 6,
            NewsTypeId: foundNewsType.id,
          },
        })
      );
    }
  }, [pageDetail, foundNewsType]);

  const getMoreNewsRequest = (newsType: NewsTypeResponse) => {
    dispatch(
      publicCmsActions.getMoreNewsListRequest({
        params: {
          ...newsParams,
          SkipCount: newsParams.SkipCount + newsParams.MaxResultCount,
          NewsTypeId: newsType.id,
        },
      })
    );
  };

  return (
    <div style={{ backgroundColor: "#80808008" }}>
      <div className="container py-2 py-md-5">
        <Row gutter={[30, 10]}>
          <Col span={24} md={14} lg={16}>
            {foundNewsType && (
              <div>
                <NewsPublicSection
                  title={foundNewsType.name}
                  newsList={news?.items || []}
                />
                {!!news?.items?.length &&
                  newsParams?.SkipCount + newsParams?.MaxResultCount <
                    news.totalCount && (
                    <div className="w-100 mb-2 mt-4 d-flex flex-row justify-content-center">
                      <Button
                        type="primary"
                        loading={isFetchingMore}
                        onClick={() => getMoreNewsRequest(foundNewsType)}
                      >
                        {t("Show more", { ns: "common" })}
                      </Button>
                    </div>
                  )}
              </div>
            )}
          </Col>
          <Col span={24} md={10} lg={8}>
            <NewsPublicSider />
          </Col>
        </Row>
      </div>
    </div>
  );
};
