export function getCards() {
  return [
    "Dummy test 3",
    "Dummy test 1",
    "Dummy test 2 (changed name)"
  ]
}

export function getBoardName() {
  return {"_value":"WeWeregonnatest"}
}

export function getBoard(){
  return [
    {
      "name": "Sprint 1",
      "cards": [
        {
          "id": "5bbb7e7179dbc3195a25b5c4",
          "name": "Dummy test 3",
          "desc": "description 3",
          "labels": [
            {
              "id": "5bc639327dab8021e0a7cd30",
              "idBoard": "5bbb7e4006d2af393fc53e4d",
              "name": "Red ALert",
              "color": "sky"
            }
          ]
        }
      ]
    },
    {
      "name": "Doing",
      "cards": [
        {
          "id": "5bbb7e69a4d5a5087b15d4b9",
          "name": "Dummy test 1",
          "desc": "description 1",
          "labels": [

          ]
        }
      ]
    },
    {
      "name": "Code review",
      "cards": [
        {
          "id": "5bbb7e6e9eda7486d4933698",
          "name": "Dummy test 2 (changed name)",
          "desc": "description 2",
          "labels": [
            {
              "id": "5bbb7e409c16fb124af1f73d",
              "idBoard": "5bbb7e4006d2af393fc53e4d",
              "name": "",
              "color": "red"
            },
            {
              "id": "5bc639327dab8021e0a7cd30",
              "idBoard": "5bbb7e4006d2af393fc53e4d",
              "name": "Red ALert",
              "color": "sky"
            },
            {
              "id": "5bbb7e409c16fb124af1f73b",
              "idBoard": "5bbb7e4006d2af393fc53e4d",
              "name": "",
              "color": "orange"
            },
            {
              "id": "5bbb7e409c16fb124af1f74b",
              "idBoard": "5bbb7e4006d2af393fc53e4d",
              "name": "",
              "color": "purple"
            }
          ]
        }
      ]
    },
    {
      "name": "functional review",
      "cards": [

      ]
    },
    {
      "name": "Done",
      "cards": [
        {
          "id": "5bc3bc79b5ee6e38818fa29d",
          "name": "Hi",
          "desc": "this is me, your inner consciousness",
          "labels": [
            {
              "id": "5bbb7e409c16fb124af1f73c",
              "idBoard": "5bbb7e4006d2af393fc53e4d",
              "name": "labelnameyellow",
              "color": "yellow"
            }
          ]
        },
        {
          "id": "5bd2227d2017153d69c311d6",
          "name": "testing",
          "desc": "",
          "labels": [

          ]
        },
        {
          "id": "5bd6eed6b65c2c5a1a169438",
          "name": "Hello",
          "desc": "",
          "labels": [

          ]
        }
      ]
    }
  ]
}

export function getList() {
  return [
    {
      "name": "Dummy test 3",
      "desc": "description 3",
      "id": "5bbb7e7179dbc3195a25b5c4",
      "labels": [
        {
          "id": "5bc639327dab8021e0a7cd30",
          "idBoard": "5bbb7e4006d2af393fc53e4d",
          "name": "Red ALert",
          "color": "sky"
        }
      ]
    }
  ]
}

export function getListIds() {
  return [
    "5bbb7e48bb0b626c65e5d1dc",
    "5bbb7e4a5f79c117868a158f",
    "5bbb7e51f0eed077f49e9454",
    "5bbb7e5bd3f5650c49d0eedc",
    "5bbb7e4b73f7c187a06a62bb"
  ]
}

export function getListName() {
  return {"name":"Sprint 1"}
}

export function getLabels() {
  return [
    {
      "id": "5bc639327dab8021e0a7cd30",
      "name": "Red ALert",
      "color": "sky"
    },
    {
      "id": "5bbb7e409c16fb124af1f73b",
      "name": "",
      "color": "orange"
    },
    {
      "id": "5bbb7e409c16fb124af1f73c",
      "name": "labelnameyellow",
      "color": "yellow"
    },
    {
      "id": "5bbb7e409c16fb124af1f73d",
      "name": "",
      "color": "red"
    },
    {
      "id": "5bbb7e409c16fb124af1f74b",
      "name": "",
      "color": "purple"
    },
    {
      "id": "5bbb7e409c16fb124af1f73e",
      "name": "",
      "color": "green"
    },
    {
      "id": "5bbb7e409c16fb124af1f747",
      "name": "",
      "color": "blue"
    }
  ]
}

export function getLabelNCMap(){
  return {
    "sky":"Red ALert",
    "yellow":"labelnameyellow"
  }
}

export function getFilteredBoard(){
  return [
    {
      "name": "Sprint 1",
      "cards": [
        {
          "id": "5bbb7e7179dbc3195a25b5c4",
          "name": "Dummy test 3",
          "desc": "description 3",
          "labels": [
            {
              "id": "5bc639327dab8021e0a7cd30",
              "idBoard": "5bbb7e4006d2af393fc53e4d",
              "name": "Red ALert",
              "color": "sky"
            }
          ]
        }
      ]
    },
    {
      "name": "Doing",
      "cards": [

      ]
    },
    {
      "name": "Code review",
      "cards": [
        {
          "id": "5bbb7e6e9eda7486d4933698",
          "name": "Dummy test 2 (changed name)",
          "desc": "description 2",
          "labels": [
            {
              "id": "5bbb7e409c16fb124af1f73d",
              "idBoard": "5bbb7e4006d2af393fc53e4d",
              "name": "",
              "color": "red"
            },
            {
              "id": "5bc639327dab8021e0a7cd30",
              "idBoard": "5bbb7e4006d2af393fc53e4d",
              "name": "Red ALert",
              "color": "sky"
            },
            {
              "id": "5bbb7e409c16fb124af1f73b",
              "idBoard": "5bbb7e4006d2af393fc53e4d",
              "name": "",
              "color": "orange"
            },
            {
              "id": "5bbb7e409c16fb124af1f74b",
              "idBoard": "5bbb7e4006d2af393fc53e4d",
              "name": "",
              "color": "purple"
            }
          ]
        }
      ]
    },
    {
      "name": "functional review",
      "cards": [

      ]
    },
    {
      "name": "Done",
      "cards": [

      ]
    }
  ]
}

export function getCardHistory(){
  return [
    {
      "column": "Sprint 1",
      "date": "2018-10-08T15:57:35.007Z"
    },
    {
      "column": "Doing",
      "date": "2018-10-08T15:57:43.410Z"
    },
    {
      "column": "Code review",
      "date": "2018-10-17T10:46:27.792Z"
    },
    {
      "column": "Doing",
      "date": "2018-10-17T10:47:03.477Z"
    },
    {
      "column": "Code review",
      "date": "2018-10-23T00:24:10.005Z"
    }
  ]
}


module.exports = GetDummyData;