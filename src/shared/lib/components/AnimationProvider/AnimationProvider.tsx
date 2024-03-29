import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type GestureType = typeof import('@use-gesture/react');
type SpringType = typeof import('@react-spring/web');

interface AnimationContextPayload {
  Gesture?: GestureType;
  Spring?: SpringType;
  isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

const getAsyncAnimationModules = async () => {
  return Promise.all([
    import('@use-gesture/react'),
    import('@react-spring/web'),
  ]);
};

export const useAnimationLibs = () => {
  return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const GestureRef = useRef<GestureType>();
  const SpringRef = useRef<SpringType>();

  useEffect(() => {
    getAsyncAnimationModules().then(([Gesture, Spring]) => {
      GestureRef.current = Gesture;
      SpringRef.current = Spring;
      setIsLoaded(true);
    });
  }, []);

  const value = useMemo(
    () => ({
      Gesture: GestureRef.current,
      Spring: SpringRef.current,
      isLoaded,
    }),
    [isLoaded]
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
