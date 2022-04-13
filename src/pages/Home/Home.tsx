import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'router/const';

export const HomePage: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({
      pathname: RoutePaths.AUTH
    })
  }, [])

  return null;
}
