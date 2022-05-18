import { ActionType } from "../action-types";
import { studentsTable, classesTable } from "../../utils/airtable";
import { Dispatch } from "redux";
import { Action } from "./types";

export const getUser = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.USER_LOADING,
  });

  studentsTable
    .select({
      fields: ["Name", "Classes"],
      view: "Grid view",
      filterByFormula: `NOT({Name} = '')`,
    })
    .eachPage(
      function page(records: any[], fetchNextPage: Function) {
        records.forEach(function (record) {
          console.log("Retrieved", record.get("Name"));
          console.log("ids", record.id);

          dispatch({
            type: ActionType.USER_LOADED,
            payload: record,
          });
        });
        fetchNextPage();
      },
      function done(error: string) {
        if (error) {
          console.error(error);

          dispatch({
            type: ActionType.AUTH_ERROR,
          });
        }
      }
    );
};

export const signIn = (name: string) => (dispatch: Dispatch<Action>) => {
  studentsTable
    .select({
      fields: ["Name", "Classes"],
      view: "Grid view",
      filterByFormula: "NOT({Name} = '')",
    })
    .eachPage(
      function page(records: any[], fetchNextPage: Function) {
        records.forEach(function (record) {
          if (name === record.fields.Name) {
            //Classes
            classesTable
              .select({
                fields: ["Name", "Students"],
                view: "Grid view",
                filterByFormula: "NOT({Name} = '')",
              })
              .eachPage(
                function page(recordsClasses: any[], fetchNextPage: Function) {
                  recordsClasses.forEach(function (recordedClasses) {
                    if (
                      recordedClasses.fields.Students.find((rec: any) => {
                        return rec === record.id;
                      })
                    ) {
                      const { Name, Students } = recordedClasses.fields;

                      dispatch({
                        type: ActionType.LOGIN_SUCCESS,
                        payload: [Name, Students],
                      });
                      console.log(
                        "Retrieved them",
                        recordedClasses.fields.Students
                      );
                    }
                  });

                  fetchNextPage();
                },
                function done(err: Error) {
                  if (err) {
                    console.error(err);
                    return;
                  }
                }
              );
          }
        });

        fetchNextPage();
      },
      function done(error: string) {
        if (error) {
          console.error(error);
        }
      }
    );
};

export const logout = () => {
  return {
    type: ActionType.LOGOUT,
  };
};
