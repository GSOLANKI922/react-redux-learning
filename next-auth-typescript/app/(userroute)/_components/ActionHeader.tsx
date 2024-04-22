import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  MenuProps,
  Select,
  Space,
} from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

interface Items {
  menuProps: {
    items: ItemType[];
    onClick: () => any;
  };
}

interface MovieList {
  adult?: string;
  originalTitle?: string;
  budget?: number;
  countries?: {
    englishName?: string;
  };
  id?: string;
}

interface Pagination {
  isCurPage?: number;
  isListOrder?: string;
  isField?: string;
  isSearch?: string;
}

const ActionHeader = ({
  setIsPagination,
  isPagination,
  filedOptions,
  listOptions,
  categoryOptions,
  buttonName,
  href,
  setMovieList,
}: {
  setIsPagination: React.Dispatch<React.SetStateAction<Pagination>>;
  isPagination?: Pagination;
  filedOptions?: {
    label: string;
    value: string;
  }[];
  listOptions?: {
    label: string;
    value: string;
  }[];
  categoryOptions?: {
    label: string;
    value: string;
  }[];
  buttonName?: string;
  href: string;
  setMovieList?: Dispatch<SetStateAction<MovieList[]>>;
}) => {
  const router = useRouter();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "none",
        }}
        className="action-header"
      >
        <div className="flex w-full justify-between">
          <div className="flex gap-5">
            {filedOptions && (
              <Select
                defaultValue="createdAt"
                style={{ width: 120 }}
                onChange={(value) => {
                  if (setMovieList) {
                    setMovieList([]);
                  }

                  setIsPagination((prev) => ({
                    ...prev,
                    isField: value,
                    isCurPage: 0,
                  }));
                }}
                options={filedOptions}
              />
            )}
            {listOptions && (
              <Select
                defaultValue="ASC"
                style={{ width: 120 }}
                onChange={(value) => {
                  if (setMovieList) {
                    setMovieList([]);
                  }
                  setIsPagination((prev) => ({
                    ...prev,
                    isListOrder: value,
                  }));
                }}
                options={listOptions}
              />
            )}
            {categoryOptions && (
              <Select
                defaultValue="LATEST"
                style={{ width: 120 }}
                onChange={(value) => {
                  if (setMovieList) {
                    setMovieList([]);
                  }
                  setIsPagination((prev) => ({
                    ...prev,
                    isCategory: value,
                  }));
                }}
                options={categoryOptions}
              />
            )}
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="text"
              onChange={(e) => {
                if (setMovieList) {
                  setMovieList([]);
                }
                setIsPagination((prev) => ({
                  ...prev,
                  isSearch: e.target.value,
                  isCurPage: 0,
                }));
              }}
              placeholder="Enter search term"
              value={isPagination?.isSearch}
            />
            <Button type="primary" onClick={() => router.push(href)}>
              {buttonName}
            </Button>
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default ActionHeader;
