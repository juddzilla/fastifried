export default ({ actions, bottom, main, top }) => {
  return (
      <div className='bg-gray-800'>
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="w-full py-24 sm:py-32">
            <div className="">
              <p className="text-base font-semibold leading-7 text-primary">{ top || '' }</p>
              <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                  {/*<h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">*/}
                  <h2 className='mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl'>
                    { main || ' ' }
                  </h2>
                  <p className="mt-2 text-lg leading-8 text-gray-200">
                    { bottom || ' ' }
                  </p>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                  { actions && actions.map(action => {
                    if (action.hidden) {
                      return null;
                    }
                    return (
                        <button
                            className="inline-flex items-center rounded-md odd:bg-primary even:bg-secondary px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                            key={ action.display }
                            onClick={ action.onClick }
                            type="button"
                        >
                          { action.display}
                        </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}