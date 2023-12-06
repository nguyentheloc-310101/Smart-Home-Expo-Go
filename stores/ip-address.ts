import { create } from 'zustand';

type State = {
  ip: any;
};

type Action = {
  setIP: (user: State['ip']) => void;
};

const useUserStore = create<State & Action>((set) => ({
  ip: '192.168.2.23',
  setIP: (ip) => set(() => ({ ip: ip })),
}));

function useNetwork() {
  let ip = useUserStore((state) => state.ip);
  let setIP = useUserStore((state) => state.setIP);
  return { ip, setIP };
}

export default useNetwork;
