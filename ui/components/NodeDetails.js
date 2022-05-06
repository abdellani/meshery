import React from 'react';
import { NoSsr, TableCell, } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {  createTheme } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import TableSortLabel from '@material-ui/core/TableSortLabel'

class NodeDetails extends React.Component {
  constructor(props){
    super(props);
  }

  getMuiTheme = () => createTheme({
    overrides : {
      MuiInput : {
        underline : {
          "&:hover:not(.Mui-disabled):before" : {
            borderBottom : "2px solid #222"
          },
          "&:after" : {
            borderBottom : "2px solid #222"
          }
        }
      },
      MUIDataTableSearch : {
        searchIcon : {
          color : "#607d8b" ,
          marginTop : "7px",
          marginRight : "8px",
        },
        clearIcon : {
          "&:hover" : {
            color : "#607d8b"
          }
        },
      },
      MUIDataTableSelectCell : {
        checkboxRoot : {
          '&$checked' : {
            color : '#607d8b',
          },
        },
      },
      MUIDataTableToolbar : {
        iconActive : {
          color : "#222"
        },
        icon : {
          "&:hover" : {
            color : "#607d8b"
          }
        },
      }
    }
  })

  render() {
    const chartData = this.props.chartData;
    const columns = [
      // { name : "server",
      //   label : "Server",
      //   options : {
      //     filter : false,
      //     sort : true,
      //     searchable : true,
      //     customHeadRender : function CustomHead({ index, ...column }, sortColumn) {
      //       return (
      //         <TableCell key={index} onClick={() => sortColumn(index)}>
      //           <TableSortLabel active={column.sortDirection != null} direction={column.sortDirection || "asc"}>
      //             <b>{column.label}</b>
      //           </TableSortLabel>
      //         </TableCell>
      //       );
      //     },
      //   }, },
      { name : "hostname",
        label : "Hostname",
        options : {
          filter : false,
          sort : true,
          searchable : true,
          customHeadRender : function CustomHead({ index, ...column }, sortColumn) {
            return (
              <TableCell key={index} onClick={() => sortColumn(index)}>
                <TableSortLabel active={column.sortDirection != null} direction={column.sortDirection || "asc"}>
                  <b>{column.label}</b>
                </TableSortLabel>
              </TableCell>
            );
          },
        }, },
      { name : "cpu",
        label : "CPU",
        options : {
          filter : false,
          sort : true,
          searchable : true,
          customHeadRender : function CustomHead({ index, ...column }, sortColumn) {
            return (
              <TableCell key={index} onClick={() => sortColumn(index)}>
                <TableSortLabel active={column.sortDirection != null} direction={column.sortDirection || "asc"}>
                  <b>{column.label}</b>
                </TableSortLabel>
              </TableCell>
            );
          },
        }, },
      { name : "memory",
        label : "Memory",
        options : {
          filter : false,
          sort : true,
          searchable : true,
          customHeadRender : function CustomHead({ index, ...column }, sortColumn) {
            return (
              <TableCell key={index} onClick={() => sortColumn(index)}>
                <TableSortLabel active={column.sortDirection != null} direction={column.sortDirection || "asc"}>
                  <b>{column.label}</b>
                </TableSortLabel>
              </TableCell>
            );
          },
        }, },
      { name : "arch",
        label : "Arch",
        options : {
          filter : false,
          sort : true,
          searchable : true,
          customHeadRender : function CustomHead({ index, ...column }, sortColumn) {
            return (
              <TableCell key={index} onClick={() => sortColumn(index)}>
                <TableSortLabel active={column.sortDirection != null} direction={column.sortDirection || "asc"}>
                  <b>{column.label}</b>
                </TableSortLabel>
              </TableCell>
            );
          },
        }, },
      { name : "os",
        label : "OS",
        options : {
          filter : false,
          sort : true,
          searchable : true,
          customHeadRender : function CustomHead({ index, ...column }, sortColumn) {
            return (
              <TableCell key={index} onClick={() => sortColumn(index)}>
                <TableSortLabel active={column.sortDirection != null} direction={column.sortDirection || "asc"}>
                  <b>{column.label}</b>
                </TableSortLabel>
              </TableCell>
            );
          },
        }, },
      { name : "kubeletVersion",
        label : "Kubelet Version",
        options : {
          filter : false,
          sort : true,
          searchable : true,
          customHeadRender : function CustomHead({ index, ...column }, sortColumn) {
            return (
              <TableCell key={index} onClick={() => sortColumn(index)}>
                <TableSortLabel active={column.sortDirection != null} direction={column.sortDirection || "asc"}>
                  <b>{column.label}</b>
                </TableSortLabel>
              </TableCell>
            );
          },
        }, },
      { name : "containerRuntime",
        label : "Container Runtime",
        options : {
          filter : false,
          sort : true,
          searchable : true,
          customHeadRender : function CustomHead({ index, ...column }, sortColumn) {
            return (
              <TableCell key={index} onClick={() => sortColumn(index)}>
                <TableSortLabel active={column.sortDirection != null} direction={column.sortDirection || "asc"}>
                  <b>{column.label}</b>
                </TableSortLabel>
              </TableCell>
            );
          },
        }, },]

    let data = []

    const options = {
      filter : false,
      filterType : 'textField',
      responsive : 'scrollFullHeight',
      resizableColumns : true,
      selectableRows : true,
      serverSide : true,
      rowsPerPage : 10,
      rowsPerPageOptions : [10, 20, 25],
      fixedHeader : true,
      print : false,
      download : false,
      onRowsSelect : (currentRowsSelected, allRowsSelected) => {
      // const rs = self.props.results_selection;
        const res = {};
        allRowsSelected.forEach(({ dataIndex }) => {
          if (dataIndex < self.state.pageSize) {
            if (typeof res[dataIndex] !== 'undefined') {
              delete res[dataIndex];
            } else {
              res[dataIndex] = self.state.results[dataIndex];
            }
          }
        });

        self.props.updateResultsSelection({ page, results : res });
      },

      onTableChange : (action, tableState) => {
        const sortInfo = tableState.announceText
          ? tableState.announceText.split(' : ')
          :[];
        let order='';
        if (tableState.activeColumn){
          order = `${columns[tableState.activeColumn].name} desc`;
        }

        switch (action) {
          case 'changePage':
            self.fetchResults(tableState.page, self.state.pageSize, self.state.search, self.state.sortOrder);
            break;
          case 'changeRowsPerPage':
            self.fetchResults(self.state.page, tableState.rowsPerPage, self.state.search, self.state.sortOrder);
            break;
          case 'search':
            if (self.searchTimeout) {
              clearTimeout(self.searchTimeout);
            }
            self.searchTimeout = setTimeout(() => {
              if (self.state.search !== tableState.searchText) {
                self.fetchResults(self.state.page, self.state.pageSize, tableState.searchText !== null
                  ? tableState.searchText
                  : '', self.state.sortOrder);
              }
            }, 500);
            break;
          case 'sort':
            if (sortInfo.length == 2) {
              if (sortInfo[1] === 'ascending') {
                order = `${columns[tableState.activeColumn].name} asc`;
              } else {
                order = `${columns[tableState.activeColumn].name} desc`;
              }
            }
            if (order !== this.state.sortOrder) {
              self.fetchResults(self.state.page, self.state.pageSize, self.state.search, order);
            }
            break;
        }
      },
    };

    let server = chartData?.options?.metadata?.kubernetes?.display?.value[0]?.display?.value;

    chartData?.options?.metadata?.kubernetes?.display?.value[1]?.display?.value.map((node) => {
      let d = node?.display?.value
      let arr = []
      Object.keys(d).map(el => {
        arr.push(d[el].display?.value)
      })
      data.push(arr)
    })

    return (
      <NoSsr>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={<div style={{ fontSize : 18 }}>Node Details (Server Version: {server})</div>}
            data={data}
            options={options}
            columns={columns}
          />
        </MuiThemeProvider>
      </NoSsr>
    )
  }
}

export default NodeDetails;
