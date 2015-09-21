class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]

  def index
    if params[:tag].blank? # If no tag is selected in URL - show all articles
      @articles = Article.all.order('created_at DESC')
    else # if tag selected - show all articles with that tag
      @tag_id = Tag.find_by(name: params[:tag]).id
      @articles = Article.where(tag_id: @tag_id).order('created_at DESC')
    end
  end

  def show
    # DRY method - set_article defined in top/bottom


  def new
    if current_user
      @article = Article.new
      current_user = @article.user
    else
      redirect_to '/login', notice: 'You need to be signed in to publish a new article!'
    end
  end

  def edit
  end

  def create
    @article = Article.new(article_params)
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
      format.html { redirect_to root_path, notice: 'Adios - your article has been deleted.' }
      format.json { head :no_content }
    end
  end

  private

    def set_article
      @article = Article.find(params[:id])
    end

    def article_params
      params.require(:article).permit(:title, :content, :user_id, :tag_id)
    end
end
