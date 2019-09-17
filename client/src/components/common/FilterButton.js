import React from 'react';

// Bootstrap
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const FilterButton = ({ setFilter, countries, leagues, filter }) => (
  <DropdownButton
    id="dropdown-basic-button"
    title={`Filter by: ${filter}`}
    variant="outline-primary"
    onClick={e =>
      e.target.innerText.startsWith('Filter') ||
      e.target.innerText.startsWith('Date') ||
      e.target.innerText.startsWith('League') ||
      e.target.innerText.startsWith('Rating') ||
      e.target.innerText.startsWith('User') ||
      e.target.innerText.startsWith('Country')
        ? ''
        : setFilter(e.target.innerText)
    }
  >
    {/* <Dropdown.Item>League</Dropdown.Item>
  <Dropdown.Item>Competition</Dropdown.Item>
  <Dropdown.Item>Date</Dropdown.Item> */}
    <DropdownButton
      title="Country"
      id="dropdown-menu-align-right"
      className="custom-dropdown"
      variant="outline-primary"
    >
      {countries.map(country => (
        <Dropdown.Item style={{ fontSize: '14px' }} key={country}>
          {country}
        </Dropdown.Item>
      ))}
    </DropdownButton>
    <DropdownButton
      title="Leagues"
      id="dropdown-menu-align-right"
      className="custom-dropdown"
      variant="outline-primary"
    >
      {leagues.map(league =>
        league.map(l => <Dropdown.Item key={l}>{l}</Dropdown.Item>)
      )}
    </DropdownButton>
    <DropdownButton
      title="Date"
      id="dropdown-menu-align-right"
      className="custom-dropdown"
      variant="outline-primary"
    >
      <Dropdown.Item eventKey="1">Today</Dropdown.Item>
      <Dropdown.Item eventKey="2">Tomorrow</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="3">Expired</Dropdown.Item>
    </DropdownButton>
    <DropdownButton
      title="Rating"
      id="dropdown-menu-align-right"
      className="custom-dropdown"
      variant="outline-primary"
    >
      <Dropdown.Item eventKey="3">Top Betters</Dropdown.Item>
      <Dropdown.Item eventKey="3">Worst Betters</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="1">Most Liked</Dropdown.Item>
      <Dropdown.Item eventKey="2">Most Disliked</Dropdown.Item>
    </DropdownButton>

    <DropdownButton
      title="User"
      id="dropdown-menu-align-right"
      className="custom-dropdown"
      variant="outline-primary"
    >
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter Username"
        style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          border: 'none',
          margin: '-10px 0'
        }}
      ></input>
      <Button
        variant="primary"
        style={{ border: 'none', marginTop: '10px' }}
        onClick={e => setFilter(e.target.parentNode.firstChild.value)}
      >
        Filter
      </Button>
    </DropdownButton>
  </DropdownButton>
);

export default FilterButton;
