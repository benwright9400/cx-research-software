const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
  { name: 'Tom Cook', title: 'Director of Product', email: 'tom.cook@example.com', role: 'Member' },
  { name: 'Whitney Francis', title: 'Copywriter', email: 'whitney.francis@example.com', role: 'Admin' },
  { name: 'Leonard Krasner', title: 'Senior Designer', email: 'leonard.krasner@example.com', role: 'Owner' },
  { name: 'Floyd Miles', title: 'Principal Designer', email: 'floyd.miles@example.com', role: 'Member' },
]

export default function DocumentTable() {
  return (
    <div className="px-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold dark:text-white mt-4">Documents</h1>
          <p className="mt-2 text-sm dark:text-gray-300 text-gray-600">
            A list of all uploaded evidence documents 
          </p>
        </div>
      </div>
      <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full divide-y divide-white/15">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold dark:text-white text-black">
                Name
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold dark:text-white text-black">
                Status
              </th>
              <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 dark:bg-gray-900">
            {people.map((person) => (
              <tr key={person.email}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium dark:text-white text-gray-600 sm:w-auto sm:max-w-none">
                  {person.name}
                  <dl className="font-normal lg:hidden">
                  </dl>
                </td>
                <td className="px-3 py-4 text-sm font-medium text-gray-400">{person.role}</td>
                <td className="py-4 pl-3 pr-8 text-right text-sm font-medium">
                  <a href="#" className="text-indigo-400 hover:text-indigo-300">
                    Delete<span className="sr-only">, {person.name}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
