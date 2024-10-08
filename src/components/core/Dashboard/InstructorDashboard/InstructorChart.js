import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

const InstructorChart = ({courses}) => {
    const [currChart,setCurrChart] = useState("students")
    const randomColorGenerate=(numOfColors)=>{
        let colors = [] ;
        for(let i = 0 ; i<numOfColors ; i++){
            let color = `rgb(${Math.floor(Math.random(0,255)*256)},${Math.floor(Math.random(0,255)*256)},${Math.floor(Math.random(0,255)*256)})`
            colors.push(color)
        }
        return colors ;
    }
    const studentsChartData = {
        labels : courses.slice(0,4).map((course)=>course.courseName) ,
        datasets : [
            {
                data :courses.map((course)=>course.totalEnrolledStudents) ,
                backgroundColor : randomColorGenerate(courses.length)
            } 
        ]
    }
    const amountChartData = {
        labels : courses.slice(0,4).map((course)=>course.courseName) ,
        datasets : [
            {
                data :courses.map((course)=>course.totalAmoutGenerated) ,
                backgroundColor : randomColorGenerate(courses.length)
            } 
        ]
    }
    const options = {
        maintainAspectRatio: false,
      }
      
    return (
        <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
          <p className="sm:text-lg sm:font-bold text-sm font-medium text-richblack-5">Visualize</p>
          <div className="space-x-4 font-semibold">
            <button
              onClick={() => setCurrChart("students")}
              className={`rounded-sm p-1 sm:px-3 px-2 transition-all duration-200 ${
                currChart === "students"
                  ? "bg-richblack-700 text-yellow-50"
                  : "text-yellow-400"
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setCurrChart("income")}
              className={`rounded-sm p-1 sm:px-3 px-1 transition-all duration-200 ${
                currChart === "income"
                  ? "bg-richblack-700 text-yellow-50"
                  : "text-yellow-400"
              }`}
            >
              Income
            </button>
          </div>
          <div className="relative mx-auto aspect-square h-[300px] w-full sm:ml-0 ml-1">
            <Pie
              data={currChart === "students" ? studentsChartData : amountChartData}
              options={options}
            />
          </div>
        </div>
      )
}

export default InstructorChart
