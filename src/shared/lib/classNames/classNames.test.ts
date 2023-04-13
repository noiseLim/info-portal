import { classNames } from '../classNames/classNames';

describe('classNames', () => {
  test('with only first param', () => {
    expect(classNames('someClass')).toBe('someClass');
  });

  test('with additional class', () => {
    const expected = 'someClass firstClass secondClass';
    expect(classNames('someClass', {}, ['firstClass', 'secondClass'])).toBe(
      expected
    );
  });

  test('with mods', () => {
    const expected = 'someClass firstClass secondClass hovered scrollable';
    expect(
      classNames('someClass', { hovered: true, scrollable: true }, [
        'firstClass',
        'secondClass',
      ])
    ).toBe(expected);
  });

  test('with mods false', () => {
    const expected = 'someClass firstClass secondClass hovered';
    expect(
      classNames('someClass', { hovered: true, scrollable: false }, [
        'firstClass',
        'secondClass',
      ])
    ).toBe(expected);
  });

  test('with mods undefined', () => {
    const expected = 'someClass firstClass secondClass hovered';
    expect(
      classNames('someClass', { hovered: true, scrollable: undefined }, [
        'firstClass',
        'secondClass',
      ])
    ).toBe(expected);
  });
});
