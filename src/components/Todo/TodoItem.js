import styled from "styled-components";
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from "../../constants/style";
import PropTypes from "prop-types";

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 12px;
  }
`;

const TodoContent = styled.div`
  color: ${(props) => props.theme.colors.red_400};
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
  `}
`;

const TodoButtonWrapper = styled.div``;

const Button = styled.button`
  padding: 4px;
  color: black;
  font-size: 28px;

  &:hover {
    color: red;
  }

  & + & {
    margin-left: 10px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 24px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 16px;
  }
`;

const RedButton = styled(Button)`
  color: red;
`;

export default function TodoItem({
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
}) {
  return (
    <TodoItemWrapper>
      <TodoContent $isDone={todo.isDone} data-id={todo.id}>
        {todo.content}
      </TodoContent>
      <TodoButtonWrapper>
        <Button
          onClick={() => {
            handleToggleIsDone(todo.id);
          }}
        >
          {todo.isDone ? "未完成" : "已完成"}
        </Button>
        <RedButton
          onClick={() => {
            handleDeleteTodo(todo.id);
          }}
        >
          刪除
        </RedButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object,
  handleDeleteTodo: PropTypes.func,
  handleToggleIsDone: PropTypes.func,
};
