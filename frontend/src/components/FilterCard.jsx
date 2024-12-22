import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from '@radix-ui/react-label';

const filterData = [
  {
    filterType : "Location",
    array: ["Delhi", "Pune", "Hyderabad"]
  },
  {
    filterType : "Industry",
    array: ["IT", "Finance", "Marketing"]
  },
  {
    filterType : "Salary",
    array: ["10LPA", "20LPA", "30LPA"]
  }
]
const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md ' >
      <h1 className='font-bold text-lg '>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup>
        {
          filterData.map((data, index) => (
            <div>
              <h1 className='font-bold text-lg' > {data.filterType} </h1>
              {
                data.array.map((item, index) => {
                  return (
                    <div className='items-center flex space-x-2 my-2  ' >
                      <RadioGroupItem value={item}/>
                      <Label>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
