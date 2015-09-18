class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]

  def index
    # If there is no category in the URL path...
    # Show all the articles
    if params[:tag].blank?
      @articles = Article.all.order('created_at DESC')
    else
      # if there is a tag selected... show all articles under that tag
      @tag_id = Tag.find_by(name: params[:tag]).id
      @articles = Article.where(tag_id: @tag_id).order('created_at DESC')
    end
  end

  def show
    # Find the article + show it in Views - params defined in private
    @article = Article.find(params[:id])
  end

  def new
    if current_user
      @article = Article.new
      current_user = @article.user
    else
      redirect_to '/login'
    end
  end

  def edit
  end

  def create
    @article = Article.new(article_params)
    # @article = current_user.articles.build(article_params)
    @article.user = current_user
    respond_to do |format|
      if @article.save
        format.html { redirect_to @article, notice: 'Article was successfully created.' }
        format.json { render :show, status: :created, location: @article }
      else
        format.html { render :new }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      @article.user = current_user
      if @article.update(article_params)
        format.html { redirect_to @article, notice: 'Article was successfully updated.' }
        # @article.user_id = current_user.id
        # @article.user.first_name = current_user.first_name
        format.json { render :show, status: :ok, location: @article }
      else
        format.html { render :edit }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @article.destroy
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { head :no_content }
    end
  end

  def article_owner
    @article.destroy
    redirect_to root_path
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def article_params
      params.require(:article).permit(:title, :content, :user_id, :tag_id)
    end
end
