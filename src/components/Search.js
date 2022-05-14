import React, { useState } from "react"

import { Nav, Form } from "react-bootstrap"
import useOnclickOutside from "react-cool-onclickoutside"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import SearchService from "../services/search.service"
//import { navigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState()
  const [searchKey, setSearchKey] = useState()

  const toggle = () => {
    setSearch(true)
  }

  const closeSearch = () => (search === true ? setSearch(false) : null)

  const ref = useOnclickOutside(() => {
    closeSearch()
  })

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value;
    setSearchKey(lowerCase);
    SearchService.search('admin', 'admin').then(
        (data) => {
         console.log(data)
        // navigate("/admin");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
  };

  return (
    <Nav className="my-auto" ref={ref}>
      <Form
        className={
          search === false
            ? "searchbar fadeOutWidth"
            : search === true
            ? "searchbar fadeInWidth"
            : "searchbar"
        }
      >
        {search === true && (
          <input
            ref={ref}
            className={
              search === true
                ? "search-input fadeIn"
                : search === false
                ? "search-input fadeOut"
                : "search-input"
            }
            type="text"
            name=""
            placeholder="Search..."
            
            // onChange={(e) => setSearchKey(e.target.value)}
          />
        )}
        <div
          className={
            search === true
              ? "icon-bg fadeOut"
              : search === false
              ? "icon-bg fadeIn"
              : "icon-bg"
          }
        >
          {search !== true && (
            <FontAwesomeIcon
            value={searchKey}     
            onChange={inputHandler}  
              onClick={toggle}
              className={
                search === true
                  ? "search-icon fadeOut"
                  : search === false
                  ? "search-icon fadeIn"
                  : "search-icon"
              }
              icon={faSearch}
            />
          )}
        </div>
      </Form>
    </Nav>
  )
}

export default Search