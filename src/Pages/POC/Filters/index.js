import React, { Component } from "react";
import {
  Chip,
  Box,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import tasks from "./tasks";
import FilterButton from "./FilterButton";
import Loading from "../../../Components/Core/Loading";
import PageLayout from "../../../Components/Core/PageLayout";

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskList: tasks,
      filter: "All",
      filterCategories: [
        "CategoryA",
        "CategoryB",
        "CategoryC",
        "uncategorized",
      ],
      categories: ["CategoryA", "CategoryB", "CategoryC", "uncategorized"],
      loading: false,
    };

    this.setFilter = this.setFilter.bind(this);
    this.setCategoryFilter = this.setCategoryFilter.bind(this);
  }

  setFilter(val) {
    const { categories } = this.state;
    this.setState({
      filter: val,
    });
    if (val === "All") {
      this.setState({
        filterCategories: [...categories],
      });
    }
  }

  setCategoryFilter(event) {
    const { filterCategories } = this.state;
    const category = event.target.name;
    const newCategories = filterCategories;
    const currentCatIndex = newCategories.indexOf(category);

    if (event.target.checked && currentCatIndex === -1) {
      this.setState((prevState) => ({
        filterCategories: [...prevState.filterCategories, category],
      }));
    } else if (!event.target.checked && currentCatIndex > -1) {
      newCategories.splice(currentCatIndex, 1);
      this.setState({
        filterCategories: newCategories,
      });
    }
  }

  render() {
    const { filterCategories, taskList, filter, categories, loading } =
      this.state;
    // eslint-disable-next-line no-console
    console.log("Render: Filters");

    const FILTER_MAP = {
      All: (task) => filterCategories.includes(task.category),
      Active: (task) =>
        !task.completed && filterCategories.includes(task.category),
      Completed: (task) =>
        task.completed && filterCategories.includes(task.category),
    };
    const FILTER_NAMES = Object.keys(FILTER_MAP);

    const filterList = FILTER_NAMES.map((name) => (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === filter}
        setFilter={this.setFilter}
      />
    ));

    const filterCategoriesList = categories.map((cat) => (
      <FormControlLabel
        key={cat}
        control={
          <Checkbox
            checked={filterCategories.includes(cat)}
            onChange={this.setCategoryFilter}
            inputProps={{ "aria-label": "primary checkbox" }}
            name={cat}
          />
        }
        label={cat}
      />
    ));

    const filteredTasks = taskList.filter(FILTER_MAP[filter]).map((task) => (
      <Grid item xs={12} sm={6} md={4}>
        <Box m={1}>
          <Paper key={task.id}>
            <Box p={2}>
              <Box mb={3}>{task.name}</Box>
              <Box mr={1} component="span">
                <Chip label={task.category} variant="outlined" />
              </Box>
              <Box mr={1} component="span">
                <Chip
                  label={task.completed ? "completed" : "pending"}
                  variant="outlined"
                  color={task.completed ? "primary" : "secondary"}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Grid>
    ));
    return (
      <PageLayout pageTitle="POC: Filters">
        <Loading loading={loading} copy="Loading..." />
        <Grid spacing={10} alignItems="center" justify="center" container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                {filterList}
                <br />
                {filterCategoriesList}
              </Grid>

              {filteredTasks.length === 0 ? (
                <Alert severity="info">
                  No item found for selected criteria.
                </Alert>
              ) : (
                filteredTasks
              )}
            </Grid>
          </Grid>
        </Grid>
      </PageLayout>
    );
  }
}

export default Filters;
