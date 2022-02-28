const test = () => {
  return (
    <>
      <div class="p-20">
        <div class="group inline-block relative">
          <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
            <span class="mr-1">Dropdown</span>
          </button>
          <ul class="absolute hidden text-gray-700 group-hover:block">
            <li class="">
              <a
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >
                One
              </a>
            </li>
            <li class="">
              <a
                class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >
                Two
              </a>
            </li>
            <li class="">
              <a
                class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >
                Three is the magic number
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="parent">
        <div className="child"></div>
        <div className="child2"></div>
      </div>
    </>
  );
};

export default test;
