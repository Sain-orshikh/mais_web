import React, {useState} from 'react'
import toast from 'react-hot-toast'
import Upload from '../../../assets/upload.png'
import { MdOutlineAdd } from "react-icons/md";

interface UserData {
  username: string;
  email: string;
  password: string;
  picture: string;
  bio: string;
  badges: string[];
  achievements: string[];
}

const CreatePage = () => {

  const [newUser, setNewUser] = React.useState<UserData>({
    username: '',
    email: '',
    password: '',
    picture: '',
    bio: '',
    badges: [],
    achievements: [],
  });
  
    console.log(newUser.picture);
    const [options, setOptions] = useState(["1", "2", "3"]);
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedBadge = e.target.value;
  
      setNewUser((prevState: UserData) => ({
          ...prevState,
          badges: [...prevState.badges, selectedBadge],
      }));
  
      setOptions((prevOptions) => prevOptions.filter((option) => option !== selectedBadge));
  
      setSelectedOption("");
    };
  const [achievement, setAchievement] = useState('');

  const handleAdd = () => {
    setNewUser((prevState: UserData) => ({
      ...prevState,
      achievements: [...prevState.achievements, achievement],
    }));
    setAchievement('');
  }

  const handleCreateUser = () => {
    console.log(newUser);
    toast.success("User created successfully!");
    setNewUser({
      username: '',
      email: '',
      password: '',
      picture: '',
      bio: '',
      badges: [],
      achievements: [],
    });
    setOptions(["1", "2", "3"]);
  }
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Update the picture field in newUser state
      setNewUser(prevState => ({
        ...prevState,
        picture: URL.createObjectURL(file)
      }));
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className='w-full min-h-screen bg-gray'>
        <div className='text-5xl font-bold text-center pt-7'>
          Create a new user
        </div>
        <div className='w-[80%] sm:w-[70%] mx-auto mt-10 flex flex-col items-center justify-center'>
          <div className='flex flex-col sm:flex-row justify-between w-full'>
            <input
              type='text'
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              placeholder='Username'
              className='w-full sm:w-[47%] bg-white border rounded-md p-2'
            />
            <input
              type='email'
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder='Email'
              className='w-full sm:w-[47%] mt-2 sm:mt-0 bg-white border rounded-md p-2'              
            />
          </div>
          <div className='flex flex-col sm:flex-row justify-between w-full mt-3'>
            <input
              type='password'
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder='Password'
              className='w-full sm:w-[47%] bg-white border rounded-md p-2'
            />
            <input
              type='bio'
              value={newUser.bio}
              onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
              placeholder='Bio'
              className='w-full sm:w-[47%] mt-2 sm:mt-0 bg-white border rounded-md p-2'              
            />
          </div>
          <div className='flex flex-col sm:flex-row justify-between w-full mt-3'>
            <select
              className="w-full sm:w-[47%] bg-white border rounded-md p-2"
              value={selectedOption}
              onChange={handleChange} // Listen for change
            >
              <option value="" disabled>
                Select a badge
              </option>
              {options.map((badge) => (
                <option value={badge} key={badge}>
                  Badge {badge}
                </option>
              ))}
            </select>
            <div className='flex flex-row w-full sm:w-[47%] bg-white mt-2 sm:mt-0 border rounded-md pl-2 group focus-within:outline'>
              <input
                type='achievement'
                value={achievement}
                onChange={(e) => {setAchievement(e.target.value)}}
                placeholder='Achievement'
                className='w-[90%] py-2 focus:outline-none'              
              />
              <button onClick={handleAdd} className='border-l group-focus-within:outline hover:bg-gray-200 rounded-r-md flex justify-center items-center w-[10%]'>
                <MdOutlineAdd className='text-3xl'/>
              </button>
            </div>
          </div>
          {/*newUser.picture && (
          <img
            src={newUser.picture}
            alt="profile"
            className="w-[10rem] h-[10rem] rounded-full mt-3"
          />
          )  
          */}
          <label
                  className="flex flex-row justify-center items-center w-full h-[10rem] mx-auto mt-3 border cursor-pointer"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <img
                    src={(typeof imagePreview === "string" ? imagePreview : undefined) || Upload} // Use the uploaded image preview or fallback to the default image
                    alt="Preview"
                    className="w-[8rem] h-[8rem]" // Ensure the image covers the container
                  />
                </label>
          <button
            onClick={() => handleCreateUser()}
            className='w-full sm:w-[50%] text-xl font-semibold hover:bg-gray-200 bg-white border rounded-md p-2 mt-3 mb-3'
          >
            Create
          </button>
        </div>
      </div>
    </>
  )
}

export default CreatePage