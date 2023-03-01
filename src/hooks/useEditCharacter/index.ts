import * as request from 'superagent';
import { Character } from '../../interfaces/Character';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

type EditCharacterAPI = (character: Character) => Promise<Character>;
type UseEditCharacter = (
  onSuccess?: () => void,
) => UseMutationResult<Character, unknown, Character, unknown>;

const API_ENDPOINT = 'https://characters-jsonserver.up.railway.app/characters';

const editCharacterAPI: EditCharacterAPI = async (character) => {
  const res = await request.put(API_ENDPOINT + `/${character.id}`).send(character);
  return res.body;
};

export const useEditCharacter: UseEditCharacter = (onSuccess) => {
  const queryClient = useQueryClient();

  const mutation: UseMutationResult<Character, any, Character, any> = useMutation({
    mutationFn: editCharacterAPI,
    onSuccess,
  });

  return mutation;
};
