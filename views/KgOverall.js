import TableCumulativeKG from "@/Components/TableCumulativeKG";
import ValidateStudent from "@/Components/ValidateStudent";
import Authenticated from "@/Layouts/Authenticated";
import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useState } from "react";

export default (props) => {
    const [students, setStudents] = useState(props.students);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();     
        const results = students.filter(
            (item) =>
                item.student.toLowerCase().trim() ==
                searchTerm.toLowerCase().trim()
        );
        if (results.length > 0) {
            setSearchResults(results);
        } else {
            setSearchResults({ ...students, msg: `${searchTerm} Not Found` });
        }

        setSearchTerm("");
    };


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-center text-gray-800 leading-tight capitalize">
                    End of Academic Year Cumulative Records - All Subjects
                </h2>
            }
        >
            <div className="px-12">
                <ValidateStudent success={props.success} error={props.error} />
            </div>

            <div className="py-12">
                <div className="text-center">
                    
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {props.students.length > 0 ? (
                                    <>
                                    {searchResults.length == 1 ? (
                                        <>
                                            <div>
                                                <InertiaLink
                                                     href={route("kgCumulative")}
                                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                                >
                                                    Go Back
                                                </InertiaLink>

                                                <form
                                                    onSubmit={submit}
                                                    className="m-2 flex"
                                                >
                                                    <input
                                                        value={searchTerm}
                                                        required
                                                        onChange={
                                                            handleChange
                                                        }
                                                        className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                                                        placeholder="Search Student"
                                                    />
                                                    <button className="px-2 rounded-r-lg bg-yellow-400 hover:bg-yellow-700  text-gray-800 font-bold p-2 uppercase border-yellow-500 border-t border-b border-r">
                                                        <svg
                                                            width="20"
                                                            height="20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                        >
                                                            <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
                                                        </svg>{" "}
                                                    </button>
                                                </form>
                                                <TableCumulativeKG
                                                    students={searchResults}                                        
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {searchResults.msg ? (
                                                <>
                                                    <InertiaLink
                                                        href={route("kgCumulative")}
                                                        className="underline text-sm text-gray-600 hover:text-gray-900"
                                                    >
                                                        Go Back
                                                    </InertiaLink>

                                                    <form
                                                        onSubmit={submit}
                                                        className="m-2 flex"
                                                    >
                                                        <input
                                                            value={
                                                                searchTerm
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                                                            placeholder="Search Student"
                                                            required
                                                        />
                                                        <button className="px-2 rounded-r-lg bg-yellow-400 hover:bg-yellow-700  text-gray-800 font-bold p-2 uppercase border-yellow-500 border-t border-b border-r">
                                                            <svg
                                                                width="20"
                                                                height="20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                            >
                                                                <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
                                                            </svg>{" "}
                                                        </button>
                                                    </form>

                                                    <h1 className="capitalize m-10 text-4xl text-center">
                                                        {searchResults.msg}
                                                    </h1>
                                                </>
                                            ) : (
                                                <div>
                                                    <a
                                                        className="underline text-sm text-gray-600 hover:text-gray-900"
                                                        href="javascript:history.back()"
                                                    >
                                                        Go Back
                                                    </a>

                                                    <a
                                                        href='/kgCumulativePdf'
                                                        className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded-md ml-10"
                                                    >
                                                        Save as Pdf
                                                    </a>
                                                

                                                    <form
                                                        onSubmit={submit}
                                                        className="m-2 flex"
                                                    >
                                                        <input
                                                            value={
                                                                searchTerm
                                                            }
                                                            required
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                                                            placeholder="Search Student"
                                                        />
                                                        <button className="px-2 rounded-r-lg bg-yellow-400 hover:bg-yellow-700  text-gray-800 font-bold p-2 uppercase border-yellow-500 border-t border-b border-r">
                                                            <svg
                                                                width="20"
                                                                height="20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                            >
                                                                <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
                                                            </svg>{" "}
                                                        </button>
                                                        
                                                    </form>

                                                    <TableCumulativeKG
                                                        students={students}
                                            
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </>
                        ) : (
                            <>
                            <a
                                href="javascript:history.back()"
                                className="underline text-sm text-gray-600 hover:text-gray-900"
                            >
                                Go Back
                            </a>

                            <h1 className="text-4xl m-10 m-5">
                                SBA Not Complete
                            </h1>
                            <h6 className="text-center m-5">
                                Add students to each subject and term
                            </h6>
                        </>
                    )}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};
