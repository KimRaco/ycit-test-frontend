import React from "react"
import { API_URL } from "../url"
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'

const EmployeesTable = () => {

    const API = `${API_URL}/employees`

    const [employees, setEmployees] = useState()
    const [showId, setShowId] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        fetch(`${API}`)
            .then((response) => response.json())
            .then(data => {
                setEmployees(data.data)

            })
    }, []);

  
    

    const customSubmit = async (data) => {
        
        try {
            const response = await fetch(`${API}/create`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            

            if (response.ok) {
                window.open( '/','_self');
              } else {
                alert('Something went wrong, try again (If the email was already registered, you will have to use a new one)');
              }
            } catch (error) {
              console.error('Error submitting form:', error);
              alert('Something went wrong, try again');
            }
            
          
      }

    return (<>

        <button onClick={() => setShowId(!showId)} >Show Id</button>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Employee
        </button>

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Create New Employee</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form
                        onSubmit={handleSubmit(customSubmit)}
                        >
                            <div class="mb-3">
                                <input
                                    {...register('name', { required: true })}
                                    type='text'
                                    className='form-control mt-2'
                                    aria-describedby='basic-addon1'
                                    placeholder='Name'
                                />
                                {errors.name?.type === 'required' && (
                                    <small className='text-danger'>
                                        You need to write your name
                                    </small>
                                )}
                                <input
                                    {...register('email', { required: true })}
                                    type='email'
                                    className='form-control mt-2'
                                    aria-describedby='basic-addon1'
                                    placeholder='Email'
                                />
                                {errors.email?.type === 'required' && (
                                    <small className='text-danger'>
                                        You need to write your Email
                                    </small>
                                )}
                                <input
                                    type='number'
                                    className='form-control mt-2'
                                    {...register('age', { required: true })}
                                    min='0'
                                    max='100'
                                    placeholder='Age'
                                />
                                {errors.age?.type === 'required' && (
                                    <small className='text-danger'>
                                        You need to type your age with numbers
                                    </small>
                                )}
                                <div className='d-flex justify-content-around mt-3'>
                                    <div className='form-check'>
                                        <input
                                            className={`form-check-input`}
                                            {...register('gender', { required: true })}
                                            type='radio'
                                            value='female'
                                            id='flexRadioDefault'
                                        />
                                        <label
                                            className='form-check-label'
                                            htmlFor='flexRadioDefault'
                                        >

                                            Female
                                        </label>
                                    </div>
                                    
                                    <div className='form-check ms-3'>
                                        <input
                                            className={`form-check-input`}
                                            {...register('gender', { required: true })}
                                            type='radio'
                                            value='male'
                                            id='flexRadioDefault'
                                        />
                                        <label
                                            className='form-check-label'
                                            htmlFor='flexRadioDefault'
                                        >

                                            Male
                                        </label>
                                    </div>
                                   
                                    <div className='form-check ms-3'>
                                        <input
                                            className={`form-check-input`}
                                            {...register('gender', { required: true })}
                                            type='radio'
                                            value='other'
                                            id='flexRadioDefault'
                                        />
                                        <label
                                            className='form-check-label'
                                            htmlFor='flexRadioDefault'
                                        >

                                            Other
                                        </label>
                                    </div>
                                    {errors.gender?.type === 'required' && (
                                        <small className='text-danger ms-1'>
                                            Please, choose one option
                                        </small>
                                    )}
                                    </div>
                                    
                                </div>


                                <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <table className="table">
            <thead>
                <tr>
                    {showId &&
                        <th scope="col">Id</th>
                    }
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                </tr>
            </thead>
            <tbody>
                {employees?.map((employee) =>

                    <tr key={employee._id}>

                        {showId &&
                            <td>{employee._id}</td>
                        }

                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.age}</td>
                        <td>{employee.gender}</td>
                    </tr>


                )}

            </tbody>
        </table>

    </>
    )
}

export default EmployeesTable

