const TestDataPerson = [{
  id: 'P-C-1', // cahoots / 1 verbindung
  name: 'Max Mustermann',
  info: 'http://www.example.org/p/max-mustermann',
  provider: "official",
  cahoots: [
    {
      "organization": "C-1",
      "verified": true,
      "source": "https://www.example.org/source/source-www1"
    }
  ]
}, {
  id: 'P-C-2', // cahoots / 2 verbindungen
  name: 'Jon Doe',
  info: 'http://example.org/p/jon-doe',
  provider: "official",
  cahoots: [
    {
      "organization": "C-2",
      "source": "https://www.example.org/source/source-www1"
    },
    {
      "organization": "C-3",
      "source": "https://www.example.org/source/source-www2"
    }
  ]
}, {
  id: 'P-T-1', // torial / 1 verbindung
  name: 'Flash Gordon',
  info: 'http://www.example.org/p/flash-gordon',
  provider: "torial",
  cahoots: [
    {
      "organization": "T-1",
      "verified": true,
      "source": "https://www.example.org/source/source-www1"
    }
  ]
}, {
  id: 'P-C-10', // torial und cahoots - cahoots - 1 verbindungen
  name: 'Julius Caesar',
  info: 'http://www.example.org/p/julius-caesar',
  provider: "official",
  cahoots: [
    {
      "organization": "C-1",
      "verified": true,
      "source": "https://www.example.org/source/source-www1"
    }
  ]
}, {
  id: 'P-T-10', // torial und cahoots - torial - 1 verbindungen
  name: 'Julius Caesar',
  info: 'http://www.example.org/p/julius-caesar',
  provider: "torial",
  cahoots: [
    {
      "organization": "T-1",
      "verified": true,
      "source": "https://www.example.org/source/source-www1"
    }
  ]
}, {
  id: 'P-C-5', // cahoots -  0 verbindungen
  name: 'Dieter Hammerlasch',
  info: 'http://www.example.org/p/dieter-hammerlasch',
  provider: 'official',
  cahoots: []
}, {
  id: 'P-T-5', // torial - 0 verbindungen
  name: 'Hans im Glück',
  info: 'http://www.example.org/p/hans-im-glück',
  provider: 'torial',
  cahoots: []
}]


export default TestDataPerson;