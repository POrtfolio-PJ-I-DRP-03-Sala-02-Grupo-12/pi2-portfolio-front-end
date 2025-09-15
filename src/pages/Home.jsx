import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectViewerModal from '../components/ProjectViewerModal'

import { useProjectsAPI } from '../hooks/useProjectsAPI'

const Home = () => {
	const [projects] = useProjectsAPI()
	const [selectedProject, setSelectedProject] = useState(null)
	const [viewerOpen, setViewerOpen] = useState(false)

  const handleView = (project) => {
    setSelectedProject(project);
    setViewerOpen(true);
  };

  return (
    <div className="pb-24 bg-gabisou-primary">
      <h1 className="text-3xl font-bold pt-5 pb-10 flex justify-center text-white">
        Portfolio
      </h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
				{Array.isArray(projects) && projects.map((project) => (
					<ProjectCard
						key={project.id}
						project={project}
						isLoggedIn={false}
						onClick={() => handleView(project)}
					/>
				))}
			</div>

      <ProjectViewerModal
        visible={viewerOpen}
        onClose={() => setViewerOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default Home;
