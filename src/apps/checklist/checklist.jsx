import React from "react";
import PropTypes from "prop-types";
import Skeleton from "../../components/atoms/skeleton/skeleton";
import Button from "../../components/atoms/button/button";
import UnorderedList from "../../components/atoms/list/list";
import AlertBox from "../../components/alert/alert";

function getList(length) {
  return Array.from(new Array(length));
}

function SkeletonElement() {
  return (
    <li className="ddb-list-item">
      <section className="ddb-list-inner">
        <article className="ddb-list-content">
          <figure className="ddb-list-cover">
            <Skeleton br="0px" mb="0px" mt="0px" height="154px" width="100px" />
          </figure>
          <div className="ddb-list-data">
            <Skeleton width="45px" mb="12px" />
            <Skeleton width="145px" mb="12px" />
            <Skeleton width="95px" />
          </div>
        </article>
        <aside className="ddb-list-button ddb-list-button__remove">
          <Skeleton width="151px" height="50px" className="ddb-btn" />
        </aside>
      </section>
    </li>
  );
}

function Checklist({ loading, items, onRemove, materialUrl, authorUrl }) {
  if (loading === "active") {
    return (
      <UnorderedList className="ddb-skeleton-wrapper">
        {getList(4).map(SkeletonElement)}
      </UnorderedList>
    );
  }

  if (loading === "finished" && items.length === 0) {
    return <AlertBox type="polite" message="No items on the list!" />;
  }

  return (
    <UnorderedList>
      {items.map(item => (
        <li key={item.pid} className="ddb-list-item">
          <section className="ddb-list-inner">
            <article className="ddb-list-content">
              <figure className="ddb-list-cover">
                <a href={`${materialUrl.replace(":pid", item.pid)}`}>
                  <img src={item.coverUrlThumbnail} alt={item.title} />
                </a>
              </figure>
              <div className="ddb-list-data">
                {item.type}
                <a href={`${materialUrl.replace(":pid", item.pid)}`}>
                  <h2>{item.title}</h2>
                </a>
                <p>
                  {item.creator.map((creator, i) => {
                    return (
                      <span>
                        <a href={`${authorUrl.replace(":author", creator)}`}>
                          {creator}
                        </a>
                        {item.creator[i + 1] ? ", " : " "}
                      </span>
                    );
                  })}
                  ({item.year})
                </p>
              </div>
            </article>
            <aside className="ddb-list-button ddb-list-button__remove">
              <Button
                className="ddb-btn--charcoal"
                onClick={() => onRemove(item.pid)}
              >
                Fjern fra listen
              </Button>
            </aside>
          </section>
        </li>
      ))}
    </UnorderedList>
  );
}

Checklist.defaultProps = {
  items: [],
  loading: "inactive"
};

Checklist.propTypes = {
  loading: PropTypes.oneOf(["inactive", "active", "finished"]),
  items: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func.isRequired,
  materialUrl: PropTypes.string.isRequired,
  authorUrl: PropTypes.string.isRequired
};

export default Checklist;