import ProblemTable from "@/components/ProblemTable";
import TopBar from "@/components/TopBar";


export default function Home() {
  return (
    <main className="min-h-screen bg-dark-layer-2">
      <TopBar/>
      <h1 className="text-4xl text-center uppercase text-gray-700 dark:text-gray-400 mt-10 mb-5 font-medium">
        Problem Set 
      </h1>
      <div className="overflow-x-auto mx-auto px-6 pb-10 relative">
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto ">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
            <tr>
              <th scope="col" className="px-6 py-3 w-0 font-medium">Status</th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">Title</th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">Difficulty</th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">Category</th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">Solution</th>
            </tr>
          </thead>
          <ProblemTable/>
        </table>

        

      </div>
    </main>
  );
}
