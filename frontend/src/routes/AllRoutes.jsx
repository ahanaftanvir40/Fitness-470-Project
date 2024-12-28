
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ProtectedRoutes from '../../utils/ProtectedRoutes'
import MainPage from '../pages/MainPage'
import Roadmap from '../pages/Roadmap'
import Blogs from '@/pages/Blogs'


export default function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route element={<ProtectedRoutes />}>
                <Route path='/main' element={<MainPage />} />
                <Route path='/roadmap' element={<Roadmap />} />
                <Route path='/blog' element={<Blogs />} />
            </Route>
        </Routes>
    )
}
