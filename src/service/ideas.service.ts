import HttpException from "../exceptions/HttpException";
import Idea from "../interface/ideas.interface";
import IdeasModel from "../models/ideas.model";

class IdeaService {
  public Ideas = IdeasModel;

  public async findAllIdeas(): Promise<Idea[]> {
    const ideas: Idea[] = await this.Ideas.find();
    return ideas;
  }

  public async findIdeaBySlug(ideaSlug: string): Promise<Idea> {
    const idea: Idea = await this.Ideas.findOne({ slug: ideaSlug });

    if (!idea) throw new HttpException(400, "no idea found");
    return idea;
  }

  public async createIdea(ideaData: Idea): Promise<Idea> {
    const idea: Idea = await this.Ideas.create(ideaData);
    return idea;
  }

  public async UpdateIdea(ideaData: Idea, ideaSlug:string): Promise<Idea> {
    const idea: Idea = await this.Ideas.findOneAndUpdate({ slug: ideaSlug }, ideaData, {
      new: true,
      runValidators: true
    });

    if (!idea) throw new HttpException(404, "idea not found");
   return idea;
  }

  public async deleteIdea(ideaSlug: string): Promise<void> {
    const idea: Idea = await this.Ideas.findOne({ slug: ideaSlug });
    if (!idea) throw new HttpException(404, "idea not found");
    await this.Ideas.findOneAndRemove({ slug: ideaSlug });
  }
}

export default IdeaService;
