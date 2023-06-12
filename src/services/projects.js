export const getRelatedProjects = (_projectList) => {
    const getRandomNumber = (min = 0, max) => {
        const selectedNumber = Math.floor(Math.random() * (max -min + 1) + min);
        return selectedNumber;
    }
    const getRandomProjectIndexes = (_selectedIndexes) => {
        if (_selectedIndexes.length < 2) {
            const number = getRandomNumber(0, Math.floor(_projectList.length - 1));
            if (!_selectedIndexes.includes(number)) {
                _selectedIndexes.push(number);
            }
            return getRandomProjectIndexes(_selectedIndexes);
        }
        return _selectedIndexes
    }
    let maxRelatedProjects = 2;
    if (_projectList.length < maxRelatedProjects) {
        maxRelatedProjects = _projectList.length;
    }
    const selectedProjectIndexes = getRandomProjectIndexes([]);
    const selectedProjects = selectedProjectIndexes.map(value => _projectList[value]);
    return selectedProjects;
}