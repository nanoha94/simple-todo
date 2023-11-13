import { useRecoilState, RecoilState } from "recoil";
import styled from "@emotion/styled";
import CustomSelect from "./CustomSelect";
import { SortOptions } from "../constants/Sort";

interface Props {
  todoSortOption: RecoilState<string>;
}

const Container = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-right: 0;
  margin-left: auto;
`;

const SortSelect = ({ todoSortOption }: Props) => {
  const [option, setOption] = useRecoilState(todoSortOption);

  return (
    <Container>
      並び替え
      <CustomSelect
        options={SortOptions}
        value={option}
        onChange={(option) => {
          setOption(option);
        }}
      />
    </Container>
  );
};

export default SortSelect;
