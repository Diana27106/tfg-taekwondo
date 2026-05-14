resource "aws_security_group" "eks_cluster" {
  name        = "${var.cluster_name}-sg"
  description = "Security group for EKS cluster"
  vpc_id      = module.vpc.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.cluster_name}-sg"
  }
}

resource "aws_eks_cluster" "this" {
  name     = var.cluster_name
  role_arn = "arn:aws:iam::654654433904:role/LabRole"
  version  = "1.30"


  vpc_config {
    subnet_ids              = module.vpc.private_subnets
    security_group_ids      = [aws_security_group.eks_cluster.id]
    endpoint_public_access  = true
  }
}

resource "aws_eks_node_group" "tfg_nodes" {
  cluster_name    = aws_eks_cluster.this.name
  node_group_name = "tfg-nodes"
  node_role_arn   = "arn:aws:iam::654654433904:role/LabRole"
  subnet_ids      = module.vpc.private_subnets
  version         = "1.30"


  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 2
  }

  instance_types = ["t3.medium"]
  capacity_type  = "ON_DEMAND"
  ami_type       = "AL2_x86_64"

  depends_on = [

    aws_eks_cluster.this
  ]
}



