import React from "react";
import { Link } from "react-router-dom";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import DashboardIcon from "@mui/icons-material/Dashboard";
const SideBar = () => {
  return (
    <div className="mt-24 font-roboto mr-2   ">
      <div className="flex flex-col gap-7 p-4">
        <Link to="/admin/dashboard">
          <p className="flex gap-2 ">
            <DashboardIcon />
            Dashboard
          </p>
        </Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<PostAddIcon />}
              ></TreeItem>
            </Link>
            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />}></TreeItem>
            </Link>
          </TreeItem>
        </TreeView>
        <Link to="/admin/orders">
          <p className="flex gap-2">
            <ListAltIcon />
            Orders
          </p>
        </Link>
        <Link to="/admin/users">
          <p className="flex gap-2">
            <PeopleIcon />
            Users
          </p>
        </Link>
        <Link to="/admin/review">
          <p className="flex gap-2">
            <RateReviewIcon />
            Reviews
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
