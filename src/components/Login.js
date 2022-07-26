import { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUsers,
  setLogin,
  getAllUser,
  getAllQuestion,
} from '../features/home/homeSlice';
import { selectNotFound, selectCurrentPath } from '../app/commonSlice';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectUsers);
  const hasNotFound = useSelector(selectNotFound);
  const currentPath = useSelector(selectCurrentPath);
  const [selected, setSelected] = useState(users[0]);
  const onLogin = () => {
    dispatch(
      setLogin({
        isLoggedIn: true,
        ...selected,
      })
    );
    navigate(currentPath);
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  return (
    <div className="w-full border rounded-[6px] mt-[20px]">
      <div className="bg-gray-300 flex flex-col items-center py-4">
        <span className="text-[20px] font-bold">
          Welcome to Would You Rather App!
        </span>
        <span>Please sign to continue.</span>
      </div>
      <div className="p-4">
        <h1 className="text-center text-blue-400 font-bold text-[20px] py-[20px]">
          Sign in
        </h1>
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <div className="relative">
                <Listbox.Button className="relative w-full bg-white border  rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none  sm:text-sm">
                  <span className="flex items-center">
                    <img
                      src={selected?.avatarURL}
                      alt=""
                      className="flex-shrink-0 h-6 w-6 rounded-full"
                    />
                    <span className="ml-3 block truncate">
                      {selected?.name}
                    </span>
                  </span>
                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {users?.map((person) => (
                      <Listbox.Option
                        key={person.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-blue-400' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={person.avatarURL}
                                alt=""
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate'
                                )}
                              >
                                {person.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
        <button
          onClick={() => onLogin()}
          className="w-full py-2 bg-blue-400 rounded-[6px] font-bold mt-5 text-white"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
