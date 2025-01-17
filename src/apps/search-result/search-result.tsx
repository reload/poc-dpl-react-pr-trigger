import React, { useEffect, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import { isEmpty } from "lodash";
import SearchResultHeader from "../../components/search-bar/search-result-header/SearchResultHeader";
import usePager from "../../components/result-pager/use-pager";
import SearchResultList from "../../components/card-item-list/SearchResultList";
import {
  FacetField,
  SearchWithPaginationQuery,
  useSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import { Work } from "../../core/utils/types/entities";
import {
  createFilters,
  useGetFacets
} from "../../components/facet-browser/helper";
import { useStatistics } from "../../core/statistics/useStatistics";
import { useCampaignMatchPOST } from "../../core/dpl-cms/dpl-cms";
import {
  CampaignMatchPOST200,
  CampaignMatchPOSTBodyItem
} from "../../core/dpl-cms/model";
import Campaign from "../../components/campaign/Campaign";
import FacetBrowserModal from "../../components/facet-browser/FacetBrowserModal";
import { statistics } from "../../core/statistics/statistics";
import FacetLine from "../../components/facet-line/FacetLine";
import { getUrlQueryParam } from "../../core/utils/helpers/url";
import useGetCleanBranches from "../../core/utils/branches";
import useFilterHandler from "./useFilterHandler";
import SearchResultSkeleton from "./search-result-skeleton";
import SearchResultZeroHits from "./search-result-zero-hits";
import SearchResultInvalidSearch from "./search-result-not-valid-search";

interface SearchResultProps {
  q: string;
  pageSize: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ q, pageSize }) => {
  const { filters, clearFilter, addFilterFromUrlParamListener } =
    useFilterHandler();
  const cleanBranches = useGetCleanBranches();
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState<number>(0);
  const [canWeTrackHitcount, setCanWeTrackHitcount] = useState<boolean>(false);
  const { PagerComponent, page } = usePager({
    hitcount,
    pageSize
  });
  const { mutate } = useCampaignMatchPOST();
  const [campaignData, setCampaignData] = useState<CampaignMatchPOST200 | null>(
    null
  );
  const { facets: campaignFacets } = useGetFacets(q, filters);
  const minimalQueryLength = 3;

  // If q changes (eg. in Storybook context)
  // then make sure that we reset the entire result set.
  useDeepCompareEffect(() => {
    setResultItems([]);
  }, [q, pageSize, filters]);

  const { track } = useStatistics();
  useEffect(() => {
    track("click", {
      id: statistics.searchQuery.id,
      name: statistics.searchQuery.name,
      trackedData: q
    });
    // We actually just want to track if the query changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  useDeepCompareEffect(() => {
    if (campaignFacets) {
      mutate(
        {
          data: campaignFacets as CampaignMatchPOSTBodyItem[],
          params: {
            _format: "json"
          }
        },
        {
          onSuccess: (campaign) => {
            setCampaignData(campaign);
          }
        }
      );
    }
  }, [campaignFacets, mutate]);

  // Check for material type filters in url on pageload
  // This is an initial, intentionally simple approach supporting what is required by the search header.
  // It could be reworked to support all filters and terms at a later point.
  useEffect(() => {
    addFilterFromUrlParamListener(FacetField.MaterialTypesSpecific);
    addFilterFromUrlParamListener(FacetField.WorkTypes);
  }, [addFilterFromUrlParamListener]);

  const { data, isLoading } = useSearchWithPaginationQuery(
    {
      q: { all: q },
      offset: page * pageSize,
      limit: pageSize,
      filters: createFilters(filters, cleanBranches)
    },
    { enabled: q.length >= minimalQueryLength }
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    const {
      search: { works: resultWorks, hitcount: resultCount }
    } = data as {
      search: {
        works: Work[];
        hitcount: SearchWithPaginationQuery["search"]["hitcount"];
      };
    };

    setHitCount(resultCount);

    // if page has change then append the new result to the existing result
    if (page > 0) {
      setResultItems((prev) => [...prev, ...resultWorks]);
      return;
    }

    setResultItems(resultWorks);
  }, [data, page]);

  useEffect(() => {
    // We want to disregard the first hitcount because it is always 0 and doesn't
    // represent reality (the number is set manually by us in the code). We only
    // track all the following hitcount values that are based on the data.
    if (!canWeTrackHitcount) {
      setCanWeTrackHitcount(true);
      return;
    }
    track("click", {
      id: statistics.searchResultCount.id,
      name: statistics.searchResultCount.name,
      trackedData: hitcount ? hitcount.toString() : "0"
    });
    // We actaully just want to track if the hitcount changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hitcount]);

  useEffect(() => {
    if (campaignData?.data?.title) {
      track("click", {
        id: statistics.campaignShown.id,
        name: statistics.campaignShown.name,
        trackedData: campaignData.data.title
      });
    }
    // We only want to track when campaignData changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignData]);

  // This is a hack to clear filters when the user navigates
  // to the search page from links where there should be no filters.
  useEffect(() => {
    const filtersUrlParam = getUrlQueryParam("filters");
    if (filtersUrlParam !== "usePersistedFilters") clearFilter();
  }, [clearFilter]);

  if (!q || q.length < minimalQueryLength) {
    return <SearchResultInvalidSearch />;
  }

  if (isLoading) {
    return <SearchResultSkeleton q={q} />;
  }

  if (hitcount === 0) {
    return <SearchResultZeroHits />;
  }

  if (q === "") {
    return <SearchResultZeroHits />;
  }

  return (
    <div className="card-list-page">
      <SearchResultHeader hitcount={hitcount} q={q} />
      <FacetLine q={q} />
      {campaignData && campaignData.data && (
        <Campaign campaignData={campaignData.data} />
      )}
      <SearchResultList
        resultItems={resultItems}
        page={page}
        pageSize={pageSize}
      />
      <PagerComponent isLoading={isLoading} />
      {!isEmpty(resultItems) && <FacetBrowserModal q={q} />}
    </div>
  );
};

export default SearchResult;
